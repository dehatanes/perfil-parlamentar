const express = require("express");

const router = express.Router();

const models = require("../../models/index");

const Parlamentar = models.parlamentar;
const Partido = models.partido;
const ComposicaoComissoes = models.composicaoComissoes;
const Comissoes = models.comissoes;
const Liderancas = models.liderancas;

const BAD_REQUEST = 400;
const SUCCESS = 200;

const attParlamentar = [
  ["id_parlamentar_voz", "idParlamentarVoz"],
  ["id_parlamentar", "idParlamentar"],
  ["nome_eleitoral", "nomeEleitoral"],
  "uf",
  ["em_exercicio", "emExercicio"],
  "casa"
];

const attPartido = [["id_partido", "idPartido"], "sigla"];
const attComposicaoComissoes = [["id_comissao_voz", "idComissaoVoz"], "cargo"];
const attComissoes = ["sigla"];
const attLideranca = ["cargo"];

/**
* @swagger
* tags:
*   name: Parlamentar (busca)
*   description: Recupera parlamentares capturados pelo Perfil Parlamentar.
*/

/**
* @swagger
* path:
*  /api/busca-parlamentar/:
*    get:
*      summary: Recupera parlamentares em exercício com informações de Comissões e Lideranças.
*      tags: [Parlamentar (busca)]
*      responses:
*        "200":
*          description: Recupera informações da lista de parlamentares (atualmente em exercício) (com informações do parlamentar inclusas).
*/
router.get("/", (req, res) => {
  Parlamentar.findAll({
    attributes: attParlamentar,
    include: [
      {
        model: ComposicaoComissoes,
        attributes: attComposicaoComissoes,
        include: [
          {
            model: Comissoes,
            attributes: attComissoes,
            as: "infoComissao",
            required: false
          }
        ],
        as: "parlamentarComissoes",
        required: false,
        where: {
          is_membro_atual: true
        }
      },
      {
        model: Partido,
        attributes: attPartido,
        as: "parlamentarPartido",
        required: false
      },
      {
        model: Liderancas,
        attributes: attLideranca,
        as: "parlamentarLiderancas",
        required: false,
        include: [
          {
            model: Partido,
            attributes: attPartido,
            as: "liderancaPartido",
            required: false
          }
        ]
      },
    ],
    where: {
      em_exercicio: true
    }
  })
    .then(parlamentares => {
      const result = parlamentares.map(parlamentar => {
        let data = parlamentar.toJSON();
        data['nomeProcessado'] = data['nomeEleitoral'].normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        return data;
      });
      res.status(SUCCESS).json(result);
    })
    .catch(err => res.status(BAD_REQUEST).json({ err: err.message }));
});

module.exports = router;