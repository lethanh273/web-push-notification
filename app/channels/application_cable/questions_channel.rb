module ApplicationCable
  class QuestionsChannel < Channel
    def subscribed
      stream_from 'questions'
    end
  end
end
