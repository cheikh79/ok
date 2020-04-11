import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master, token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export PickbazarApi, { schema } from './model'

const router = new Router()
const { title, content } = schema.tree

/**
 * @api {post} /pickbazar-apis Create pickbazar api
 * @apiName CreatePickbazarApi
 * @apiGroup PickbazarApi
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam title Pickbazar api's title.
 * @apiParam content Pickbazar api's content.
 * @apiSuccess {Object} pickbazarApi Pickbazar api's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Pickbazar api not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ title, content }),
  create)

/**
 * @api {get} /pickbazar-apis Retrieve pickbazar apis
 * @apiName RetrievePickbazarApis
 * @apiGroup PickbazarApi
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of pickbazar apis.
 * @apiSuccess {Object[]} rows List of pickbazar apis.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /pickbazar-apis/:id Retrieve pickbazar api
 * @apiName RetrievePickbazarApi
 * @apiGroup PickbazarApi
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} pickbazarApi Pickbazar api's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Pickbazar api not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true, roles: ['admin'] }),
  show)

/**
 * @api {put} /pickbazar-apis/:id Update pickbazar api
 * @apiName UpdatePickbazarApi
 * @apiGroup PickbazarApi
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam title Pickbazar api's title.
 * @apiParam content Pickbazar api's content.
 * @apiSuccess {Object} pickbazarApi Pickbazar api's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Pickbazar api not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ title, content }),
  update)

/**
 * @api {delete} /pickbazar-apis/:id Delete pickbazar api
 * @apiName DeletePickbazarApi
 * @apiGroup PickbazarApi
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Pickbazar api not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
