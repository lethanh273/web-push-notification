class QuestionsController < ApplicationController
  def index
    @questions = Question.all
  end

  def show
    @question = Question.includes(:answers).find(params[:id])
  end

  def new
    @question = Question.new
  end

  def create
    @question = Question.new(permitted_attributes)

    if @question.save
      redirect_to questions_path, notice: 'Question was successfully created'
    else
      render :new
    end
  end

  private

  def permitted_attributes
    params.require(:question).permit(:content)
  end
end
