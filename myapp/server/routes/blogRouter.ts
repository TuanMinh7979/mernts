import express from 'express'
import blogCtrl from '../controllers/blogCtrl'
import auth from '../middleware/auth'

const router = express.Router()


router.post('/blog', auth, blogCtrl.createBlog)

router.get('/home/blog', blogCtrl.getHomeBlogs)
router.get('/home/blog0', blogCtrl.getHomeBlogs0)
router.get('/home/blogMy', blogCtrl.getHomeBlogsMy)


export default router;