import {supabase} from '../db';

export interface Complaint {
    id: number;
    name: string;
    email: string;
    complaint: string;
    status: 'Pending' | 'Resolved';
    created_at: string;
}

export interface NewComplaint {
    name: string;
    email: string;
    complaint: string;
}

export async function fetchComplaints(): Promise<Complaint[]> {
    const {data, error} = await supabase.from('complaints').select('*').order('created_at', {ascending: false});
    if(error){
        throw new Error('Failed to fetch complaints.');
    }
    return data;
}

export async function updateComplaintStatusDb(id: number, status: 'Pending' | 'Resolved'): Promise<Complaint> {
    const {data, error} = await supabase.from('complaints').update({status}).eq('id', id).single();
    if(error){
        throw new Error('Failed to update complaint.');
    }
    return data;
}

export async function createComplaintRecord(newComplaint: NewComplaint): Promise<Complaint> {
    const {data, error} = await supabase.from('complaints').insert(newComplaint).select().single();
    if(error){
        throw new Error('Failed to create complaint.');
    }
    return data;
}

export async function deleteComplaintById(id: number): Promise<void> {
    const {error} = await supabase.from('complaints').delete().eq('id', id);
    if(error){
        throw new Error('Failed to delete complaint.');
    }
}