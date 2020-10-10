module ApplicationCable
  class AnswersChannel < Channel
    def subscribed
      stream_from "answers_#{params[:question_id]}"
    end
  end
end
