class Question < ApplicationRecord
  has_many :answers

  validates :content, presence: true

  after_create :send_broadcast

  private

  def send_broadcast
    ActionCable.server.broadcast 'questions', id: id, content: content
  end
end
