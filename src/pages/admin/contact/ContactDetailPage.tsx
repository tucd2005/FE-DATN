// src/pages/contact/ContactDetailPage.tsx
import { useParams, useNavigate } from 'react-router-dom'
import { useContactDetail, useReplyContact, useUpdateContactStatus } from '../../../hooks/useContact'
import { Descriptions, Card, Button, Input, Tag, Spin, message, Typography } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'

const { Title } = Typography
const { TextArea } = Input

const typeLabels: Record<string, string> = {
  gop_y: 'Góp ý',
  khieu_nai: 'Khiếu nại',
  hop_tac: 'Hợp tác',
  ho_tro: 'Hỗ trợ',
}

const statusColors: Record<string, string> = {
  chua_xu_ly: 'orange',
  da_tra_loi: 'green',
  dang_xu_ly: 'blue',
}

const statusLabels: Record<string, string> = {
  chua_xu_ly: 'Chưa xử lý',
  da_tra_loi: 'Đã trả lời',
  dang_xu_ly: 'Đang xử lý',
}

export default function ContactDetailPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const contactId = parseInt(id || '', 10)
  const { data: detail, isLoading } = useContactDetail(contactId)

  const [replyContent, setReplyContent] = useState('')
  const queryClient = useQueryClient()
  const replyMutation = useReplyContact()
  const statusMutation = useUpdateContactStatus()

  useEffect(() => {
    if (detail?.reply_content) {
      setReplyContent(detail.reply_content)
    }
  }, [detail])

  const handleReply = () => {
    if (!detail) return
    replyMutation.mutate(
      { id: detail.id, reply_content: replyContent },
      {
        onSuccess: () => {
          message.success('Đã gửi phản hồi')
          queryClient.invalidateQueries({ queryKey: ['contact', detail.id] })
        },
      }
    )
  }

  const handleUpdateStatus = (newStatus: string) => {
    if (!detail) return
    statusMutation.mutate(
      { id: detail.id, status: newStatus },
      {
        onSuccess: () => {
          message.success('Cập nhật trạng thái thành công')
          queryClient.invalidateQueries({ queryKey: ['contact', detail.id] })
        },
      }
    )
  }

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}><Spin size="large" /></div>
  }

  if (!detail) {
    return <div className="text-center text-red-500">Không tìm thấy dữ liệu liên hệ.</div>
  }

  return (
    <div className="max-w-5xl mx-auto mt-6">
      {/* Nút quay lại */}
      <Button
        type="default"
        icon={<LeftOutlined />}
        onClick={() => navigate('/admin/lien-he')}
        style={{ marginBottom: 16 }}
      >
        Quay lại
      </Button>

      <Card>
        <Title level={4}>Chi tiết liên hệ #{detail.id}</Title>
        <Descriptions bordered column={2} size="small">
          <Descriptions.Item label="Tên">{detail.name}</Descriptions.Item>
          <Descriptions.Item label="Email">{detail.email}</Descriptions.Item>
          <Descriptions.Item label="SĐT">{detail.phone}</Descriptions.Item>
          <Descriptions.Item label="Tiêu đề">{detail.subject}</Descriptions.Item>
          <Descriptions.Item label="Loại">{typeLabels[detail.type]}</Descriptions.Item>
          <Descriptions.Item label="Trạng thái">
            <Tag color={statusColors[detail.status]}>{statusLabels[detail.status]}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Nội dung" span={2}>
            <div className="bg-gray-50 p-2 border rounded">{detail.message}</div>
          </Descriptions.Item>
        </Descriptions>

        {detail.status === 'chua_xu_ly' && (
          <Button
            onClick={() => handleUpdateStatus('dang_xu_ly')}
            loading={statusMutation.isPending}
            style={{ marginTop: 16 }}
          >
            Đánh dấu đang xử lý
          </Button>
        )}

        {detail.status !== 'da_tra_loi' ? (
          <div style={{ marginTop: 24 }}>
            <Title level={5}>Phản hồi</Title>
            <TextArea
              rows={4}
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
            />
            <Button
              type="primary"
              loading={replyMutation.isPending}
              onClick={handleReply}
              disabled={!replyContent.trim()}
              style={{ marginTop: 8 }}
            >
              Gửi phản hồi
            </Button>
          </div>
        ) : (
          <div style={{ marginTop: 24 }}>
            <Title level={5}>Nội dung phản hồi</Title>
            <div style={{ background: '#f6ffed', padding: 12, border: '1px solid #b7eb8f', borderRadius: 4 }}>
              {detail.reply_content}
            </div>
            {detail.replied_at && (
              <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>
                Phản hồi lúc: {dayjs(detail.replied_at).format('DD/MM/YYYY HH:mm')}
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  )
}
