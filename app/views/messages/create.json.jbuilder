json.content @message.content
json.image @message.image.url
json.group_id @message.group_id
json.created_at @message.created_at.strftime("%Y/%m/%d %H:%M")
json.user_name @message.user.name