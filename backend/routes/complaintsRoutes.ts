import {Router} from 'express';
import {createComplaint, getComplaints, updateComplaintStatus, deleteComplaint} from '../controllers/complaintsController';
import {isAdmin} from '../middleware/isAdmin';

const router = Router();

router.post('/', createComplaint);
router.get('/', isAdmin, getComplaints);
router.patch('/:id', isAdmin, updateComplaintStatus);
router.delete('/:id', isAdmin, deleteComplaint);

export default router;