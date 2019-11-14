$(function(){  

  function buildMessage(message){
  var addImage = (message.image !== null) ? `<img class = "lower-message__image", src="${message.image}">` : ''
  let html = `<div class="message" data-message-id="${message.id}">
                <div class="upper-message">
                  <div class="upper-message__user-name">
                  ${message.user_name}
                  </div>
                  <div class="upper-message__date">
                  ${message.created_at}
                  </div>
                </div>
                <div class="lower-message">
                  <p class="lower-message__content">
                  ${message.content}
                  </p>
                  <p class="lower-message__image">
                  ${addImage}
                  <p>
                </div>
              </div>`
  return html;
  }
  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData, 
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      let html = buildMessage(message);
      $('.messages').append(html)
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight })
      $("#new_message")[0].reset()
      $(".form__submit").prop("disabled", false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました")
      $(".form__submit").prop("disabled", false);
    });
  });

  var reloadMessages = function(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id =$('.message:last').data("message-id");
      $.ajax({
        url:  "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages){
      
        var insertHtml = '';
        messages.forEach(function (message) {
          insertHtml = buildMessage(message);
          $('.messages').append(insertHtml);  
        })        
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
      })
      .fail(function(){
        alert('自動更新に失敗しました');
      });
      }
     };
     setInterval(reloadMessages,7000);  
  });
