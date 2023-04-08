const express = require('express');
const router = express.Router();
const { getEvents, addEvent, deleteEvent, deleteEvents } = require('../controllers/calendar');
const { validateCalendar } = require('../middleware/validations');
const { authorize } = require('../middleware/authMiddleware');

// @desc    Get Events / Post / Delete Event
// @route   GET/POST/DELETE /api/calendar
// @access  Private
router.route('/').get(authorize, getEvents).post(authorize, validateCalendar, addEvent);
// .delete(authorize, deleteEvent);

router.route('/:id').delete(authorize, deleteEvent);

// @desc    Delete Events
// @route   DELETE /api/calendar/delete_all
// @access  Private
router.route('/delete_all').delete(authorize, deleteEvents);

module.exports = router;
