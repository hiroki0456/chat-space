$(function(){
  function buildHTML(message){
    // 「もしメッセージに画像が含まれていたら」という条件式
    if (message.image) {
      var html = 
      `<div class="chat-main__message-list__message-box">
        <div class="chat-main__message-list__message-box__name-data>
          ${message.user_name}
          ${message.created_at}
        </div>
        <div class="chat-main__message-list__message-box__message-data">
          ${message.content}
          <img class="lower-message__image"src=${message.image} >
        </div>
      </div>`
        return html;
        //メッセージに画像が含まれない場合のHTMLを作る
      } else {
        var html =
        `<div class="chat-main__message-list__message-box">
            <chat-main__message-list__message-box__name-data">
                ${message.user_name}
                ${message.created_at}
            </div>
              <div class="chat-main__message-list__message-box__message-data"">
                ${message.content}
            </div>
        </div>`
        return html;
      };
    }
  $('#new_message').on('submit', function(e){
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
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);      
      $('form')[0].reset();
    })
  });
});