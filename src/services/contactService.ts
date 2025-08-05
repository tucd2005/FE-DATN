import instanceAxios from "../utils/axios";

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  type: string;
  status: string;
  created_at: string;
  message: string;
  reply_content?: string;
  replied_at?: string;
}

export interface ContactListResponse {
  data: Contact[];
  current_page: number;
  last_page: number;
  total: number;
}

export const contactService = {
  getAll: (params?: any) => instanceAxios.get<ContactListResponse>("/admin/contacts", { params }),
  search: (params: { q?: string; status?: string; page?: number }) => instanceAxios.get<ContactListResponse>("/admin/contacts/search", { params }),
  getById: (id: number) => instanceAxios.get<Contact>(`/admin/contacts/${id}`),
  reply: (id: number, reply_content: string) => instanceAxios.post(`/admin/contacts/reply/${id}`, { reply_content }),
  // CLIENT
  sendContact: (data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    type?: string;
  }) => instanceAxios.post('/contact', data),
  getContactTypes: () => instanceAxios.get<{ types: Record<string, string> }>("/contact/types"),
  updateStatus: (id: number, status: string) =>
  instanceAxios.post(`/admin/contacts/status/${id}`, { status }),
};

