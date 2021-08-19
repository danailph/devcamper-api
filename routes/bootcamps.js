const express = require('express')
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsRadius,
  bootcampPhotoUpload,
} = require('../controllers/bootcamps')

const Bootcamp = require('../models/Bootcamp')
const advancedResults = require('../middleware/advancedResults')
const { protect, authorize } = require('../middleware/auth')

//Include other resources router
const courseRouter = require('./courses')
const reviewRouter = require('./reviews')

const router = express.Router()

router
  .route('/')
  .get(advancedResults(Bootcamp, '_courses _reviews'), getBootcamps)
  .post(protect, authorize('publisher', 'admin'), createBootcamp)
router
  .route('/:id')
  .get(getBootcamp)
  .put(protect, authorize('publisher', 'admin'), updateBootcamp)
  .delete(protect, authorize('publisher', 'admin'), deleteBootcamp)
router.route('/radius/:zipcode/:distance').get(getBootcampsRadius)
router.route('/:id/photo').put(protect, authorize('publisher', 'admin'), bootcampPhotoUpload)

//Re-route into other resource router
router.use('/:bootcampId/courses', courseRouter)
router.use('/:bootcampId/reviews', reviewRouter)

module.exports = router
