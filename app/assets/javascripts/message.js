$(function(){
  $('#new_message').on('submit', function(e){
    e.preventDefault()
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
    .done(function(data){
    var html = buildHTML(data);
    $('.chat-main__message-list').append(html);      
    $('form')[0].reset();
    $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
    $('input[name="commit"]').prop('disabled', false);
    })
    
    .always(function(){
    $('chat-main__message-form__message-box__message-send').prop('disabled', false);
    })

    .fail(function() {
    alert("メッセージ送信に失敗しました");
  });
  });
  });

  function buildHTML(message){
    if (message.image) {
      var html = 
    `<div class = "chat-main__message-list__message-box">
       <div class ="chat-main__message-list__message-box__name-data">
         ${message.user_name}
         ${message.created_at}
       </div>
       <div class="chat-main__message-list__message-box__message-data">
         ${message.content}
         <img class="lower-message__image" src=${message.image}>
       </div>
     </div>`
    } else {
      var html =
    `<div class = "chat-main__message-list__message-box">
       <div class="chat-main__message-list__message-box__name-data">
         ${message.user_name}
         ${message.created_at}
       </div>
       <div class="chat-main__message-list__message-box__message-data">
         ${message.content}
       </div>
     </div>`
    }
    return html
  }