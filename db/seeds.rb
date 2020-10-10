question = Question.create(content: 'Example question')

answer = question.answers.create(content: 'First answer')
answer = question.answers.create(content: 'Second answer')
