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
    $('input[name="commit"]').prop('disabled', false);
    })

    .fail(function() {
    alert("メッセージ送信に失敗しました");
  });
});
  var reloadMessages = function() {
    last_message_id = $('.chat-main__message-list__message-box:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message);
      });
        $('.chat-main__message-list').append(insertHTML);
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      }
    })
    .always(function(){
      $('input[name="commit"]').prop('disabled', false);
      })
    .fail(function() {
      alert("error");
    })
   };

  function buildHTML(message){
    if (message.image) {
      var html = 
    `<div class = "chat-main__message-list__message-box" data-message-id= ${message.id}>
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
    `<div class = "chat-main__message-list__message-box" data-message-id= ${message.id}>
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
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
  });