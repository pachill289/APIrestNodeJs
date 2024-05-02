const {Router} = require('express')
const router = Router();

const { getUsers,editUser } = require('../controllers/index.controller')

router.get('/users', getUsers)
router.get('/user', editUser)

module.exports = router;