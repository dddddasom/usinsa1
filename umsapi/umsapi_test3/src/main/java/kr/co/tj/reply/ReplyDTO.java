package kr.co.tj.reply;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReplyDTO {

	private Long id;
	private String username;
	private String content;	
	private Date createDate;
	private Date updateDate;
	private Long bid;
	
	public ReplyEntity toReplyEntity() {
		return ReplyEntity.builder()
				.id(id)
				.username(username)
				.content(content)
				.createDate(createDate)
				.updateDate(updateDate)
				.bid(bid)
				.build();
	}
	
	public static ReplyDTO toReplyDTO(ReplyEntity replyEntity) {
		return ReplyDTO.builder()
				.id(replyEntity.getId())
				.username(replyEntity.getUsername())
				.content(replyEntity.getContent())
				.createDate(replyEntity.getCreateDate())
				.updateDate(replyEntity.getUpdateDate())
				.bid(replyEntity.getBid())
				.build();
	}
	
}
