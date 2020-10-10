class AnswersController < ApplicationController
  def create
    answer = Answer.new(permitted_attributes)
    answer.save!

    redirect_to question_path(answer.question)
  end

  private

  def permitted_attributes
    params
      .require(:answer)
      .permit(:content, :question_id)
  end
end
