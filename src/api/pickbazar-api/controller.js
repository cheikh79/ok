import { success, notFound } from '../../services/response/'
import { PickbazarApi } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  PickbazarApi.create(body)
    .then((pickbazarApi) => pickbazarApi.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  PickbazarApi.count(query)
    .then(count => PickbazarApi.find(query, select, cursor)
      .then((pickbazarApis) => ({
        count,
        rows: pickbazarApis.map((pickbazarApi) => pickbazarApi.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  PickbazarApi.findById(params.id)
    .then(notFound(res))
    .then((pickbazarApi) => pickbazarApi ? pickbazarApi.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  PickbazarApi.findById(params.id)
    .then(notFound(res))
    .then((pickbazarApi) => pickbazarApi ? Object.assign(pickbazarApi, body).save() : null)
    .then((pickbazarApi) => pickbazarApi ? pickbazarApi.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  PickbazarApi.findById(params.id)
    .then(notFound(res))
    .then((pickbazarApi) => pickbazarApi ? pickbazarApi.remove() : null)
    .then(success(res, 204))
    .catch(next)
