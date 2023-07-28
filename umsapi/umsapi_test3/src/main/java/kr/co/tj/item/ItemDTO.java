package kr.co.tj.item;

import java.util.Date;

import javax.persistence.Column;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ItemDTO {
	
	private long id;	
	private String itemName;
	private long price;
	private int discount;
	private int ea;
	private String username;
	private String itemDescribe;
	private String itemType;
	private Date createDate;
	private Date updateDate;
	
	public ItemEntity toEntity(ItemDTO dto) {
		ItemEntity entity = ItemEntity.builder()
				.id(id)
				.itemName(itemName)
				.price(price)
				.discount(discount)
				.ea(ea)
				.username(username)
				.itemDescribe(itemDescribe)
				.itemType(itemType)
				.createDate(createDate)
				.updateDate(updateDate)
				.build();
		
		return entity;
	}
	
	public static ItemDTO toDto(ItemEntity entity) {
		ItemDTO dto = ItemDTO.builder()
				.id(entity.getId())
				.itemName(entity.getItemName())
				.price(entity.getPrice())
				.discount(entity.getDiscount())
				.ea(entity.getEa())
				.username(entity.getUsername())
				.itemDescribe(entity.getItemDescribe())
				.itemType(entity.getItemType())
				.createDate(entity.getCreateDate())
				.updateDate(entity.getUpdateDate())		
				.build();
		
		return dto;
	}
}
