import { Request, Response } from 'express';
import {supabase} from '../db';
import {fetchComplaints, updateComplaintStatusDb, createComplaintRecord, deleteComplaintById} from '../models/complaint';
const validator = require('validator');

export const createComplaint = async (req: Request, res: Response) => {
    const {name, email, complaint} = req.body;

    if(!name.trim() || !email.trim() || !complaint.trim()){
        return res.status(400).json({error: 'All fields are required'});
    }
    if(!validator.isEmail(email)){
        return res.status(400).json({error: 'Invalid email format'});
    }
    try {
        const newComplaint = {name, email, complaint};
        const data = await createComplaintRecord(newComplaint);
        return res.status(201).json({message: 'Complaint created successfully', data});
    } catch (error) {
        return res.status(500).json({error: 'Failed to create complaint.'});
    }
}

export const getComplaints = async (req: Request, res: Response) => {
    try {
        const data = await fetchComplaints();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({error: 'Failed to fetch complaints.'});
    }
}

export const updateComplaintStatus = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {status} = req.body;

    if(status !== 'Resolved' && status !== 'Pending'){
        return res.status(400).json({error: 'Invalid status'});
    }

    try {
        const data = await updateComplaintStatusDb(parseInt(id), status);
        return res.status(200).json({message: 'Status updated successfully.', data});
    } catch (error) {
        return res.status(500).json({error: 'Failed to update complaint.'});
    }
}

export const deleteComplaint = async (req: Request, res: Response) => {
    const {id} = req.params;

    try {
        await deleteComplaintById(parseInt(id));
        return res.status(200).json({message: 'Complaint deleted successfully.'});
    } catch (error) {
        return res.status(500).json({error: 'Failed to delete complaint'});
    }
}