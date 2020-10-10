document.addEventListener("DOMContentLoaded", function() {
  App.answers = App.cable.subscriptions.create({ channel: 'ApplicationCable::QuestionsChannel' }, {
    received: function(data) {
      var divQuestion = document.createElement('div');
      var questionLink = document.createElement('a');
      var questionLinkText = document.createTextNode(data.id + ' - ' + data.content);

      questionLink.appendChild(questionLinkText);
      questionLink.href = '/questions/' + data.id ;

      divQuestion.appendChild(questionLink);
      return document.querySelector('.questions').appendChild(divQuestion)
    }
  });
});

