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

//Include other resources router
const courseRouter = require('./courses')

const router = express.Router()

router.route('/').get(advancedResults(Bootcamp, '_courses'), getBootcamps).post(createBootcamp)
router.route('/:id').get(getBootcamp).put(updateBootcamp).delete(deleteBootcamp)
router.route('/radius/:zipcode/:distance').get(getBootcampsRadius)
router.route('/:id/photo').put(bootcampPhotoUpload)

//Re-route into other resource router
router.use('/:bootcampId/courses', courseRouter)

module.exports = router
