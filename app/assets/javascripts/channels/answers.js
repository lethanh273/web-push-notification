document.addEventListener("DOMContentLoaded", function() {
  var question_id = document.querySelector('#answer_question_id').value;

  App.answers = App.cable.subscriptions.create({ channel: 'ApplicationCable::AnswersChannel', question_id: question_id }, {
    received: function(data) {
      var liAnswer = document.createElement('li');
      var answerText = document.createTextNode(data.id + ' - ' + data.content);
      liAnswer.appendChild(answerText);

      return document.querySelector('#answers').appendChild(liAnswer)
    }
  });
});
