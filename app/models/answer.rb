class Answer < ApplicationRecord
  belongs_to :question

  validates :content, :question, presence: true

  after_create :send_broadcast
  after_create :push_notification

  private

  def send_broadcast
    ActionCable.server.broadcast "answers_#{question.id}", id: id, content: content
  end

  def push_notification
    PushNotificationJob.perform_later(question)
  end
end
