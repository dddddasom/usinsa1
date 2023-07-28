package kr.co.tj.item;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;



@Service
public class ItemService {
	@Autowired
	private ItemRepository itemRepository;

	public ItemDTO insert(ItemDTO dto) {
		ItemEntity entity = dto.toEntity(dto);
		
		Date now = new Date();
		entity.setCreateDate(now);
		entity.setUpdateDate(now);
		
		entity = itemRepository.save(entity);
		dto = ItemDTO.toDto(entity);
		
		return dto;
	}

	public ItemDTO findById(Long id) {
		Optional<ItemEntity> optional = itemRepository.findById(id);
		
		ItemEntity entity = optional.get();
		ItemDTO dto = ItemDTO.toDto(entity);
		return dto;
	}

	public List<ItemDTO> findAll() {
		List<ItemDTO> list_dto = new ArrayList<>();
		List<ItemEntity> list_entity = itemRepository.findAll();
		
		list_entity.forEach(e ->{
			list_dto.add(new ModelMapper().map(e, ItemDTO.class));
		});
		return list_dto;
	}
	
	public List<ItemDTO> findByItemType(String itemType) {
		List<ItemDTO> list_dto = new ArrayList<>();
		List<ItemEntity> list_entity = itemRepository.findByItemType(itemType);
		
		list_entity.forEach(e ->{
			list_dto.add(new ModelMapper().map(e, ItemDTO.class));
		});
		return list_dto;
	}
	
	public Page<ItemDTO> findAll(int page) {
        List<Sort.Order> sortList = new ArrayList<>();
        sortList.add(Sort.Order.desc("id"));

        Pageable pageable = PageRequest.of(page, 5, Sort.by(sortList));
        Page<ItemEntity> pageItem = itemRepository.findAll(pageable);
        Page<ItemDTO> pageDto = pageItem.map(itemEntity -> new ItemDTO(
                itemEntity.getId(),
                itemEntity.getItemName(),
                itemEntity.getPrice(),
                itemEntity.getDiscount(),
                itemEntity.getEa(),
                itemEntity.getUsername(),
                itemEntity.getItemDescribe(),
                itemEntity.getItemType(),
                itemEntity.getCreateDate(),
                itemEntity.getUpdateDate()
        ));

        return pageDto;
    }

	
	public Page<ItemDTO> findByItemType(String itemType, int page) {
		   List<Sort.Order> sortList = new ArrayList<>();
	        sortList.add(Sort.Order.desc("id"));

	        Pageable pageable = PageRequest.of(page, 5, Sort.by(sortList));
	        Page<ItemEntity> pageItem = itemRepository.findByItemType(itemType, pageable);
	        Page<ItemDTO> pageDto = pageItem.map(itemEntity -> new ItemDTO(
	                itemEntity.getId(),
	                itemEntity.getItemName(),
	                itemEntity.getPrice(),
	                itemEntity.getDiscount(),
	                itemEntity.getEa(),
	                itemEntity.getUsername(),
	                itemEntity.getItemDescribe(),
	                itemEntity.getItemType(),
	                itemEntity.getCreateDate(),
	                itemEntity.getUpdateDate()
	        ));

	        return pageDto;
	}

   public List<ItemDTO> itemListOfStaff(String username) {
	      
	      List<ItemEntity> list_entity =itemRepository.findByUsername(username);
	      
	      List<ItemDTO> list_dto = new ArrayList<>();
	      
	      for(ItemEntity e : list_entity) {
	         list_dto.add(   new ModelMapper().map(e, ItemDTO.class)    );
	      }
	      
	      return list_dto;
	   }





	
	
	@Transactional
	public ItemDTO update(ItemDTO dto) {
		Optional<ItemEntity> optioanl = itemRepository.findById(dto.getId());
		
		
		ItemEntity entity =optioanl.get();
		
		if(entity ==null) {
			throw new RuntimeException("잘못된 정보에용");
		}
		
		entity.setItemName(dto.getItemName());
		entity.setPrice(dto.getPrice());
		entity.setDiscount(dto.getDiscount());
		entity.setEa(dto.getEa());
		entity.setItemDescribe(dto.getItemDescribe());
		entity.setUpdateDate(new Date());
		entity.setItemType(dto.getItemType());
		entity = itemRepository.save(entity);
		dto = ItemDTO.toDto(entity);
		
		return dto;
	}

	@Transactional
	public void delete(long id) {
		itemRepository.deleteById(id);
		
	}

	   public Page<ItemDTO> findAll(String username, int pageNum) {
		      
	        List<Sort.Order> sortList = new ArrayList<>();
	        sortList.add(Sort.Order.desc("id"));

	        Pageable pageable = PageRequest.of(pageNum, 5, Sort.by(sortList));
	        Page<ItemEntity> pageItem = itemRepository.findByUsername(username, pageable);
	        Page<ItemDTO> pageDto = pageItem.map(itemEntity -> new ItemDTO(
	                itemEntity.getId(),
	                itemEntity.getItemName(),
	                itemEntity.getPrice(),
	                itemEntity.getDiscount(),
	                itemEntity.getEa(),
	                itemEntity.getUsername(),
	                itemEntity.getItemDescribe(),
	                itemEntity.getItemType(),
	                itemEntity.getCreateDate(),
	                itemEntity.getUpdateDate()
	        ));


	        return pageDto;
	    }

//	public List<ItemDTO> search(String keyword) {
//		
//		List<ItemEntity> list_entity = itemRepository.findByitemNameContaining(keyword);
//		List<ItemDTO> list_dto = new ArrayList<>();
//		
//		for(ItemEntity e : list_entity) {
//	         list_dto.add(   new ModelMapper().map(e, ItemDTO.class)    );
//	      }
//	      
//		return list_dto;
//	}
	   
		
		public List<ItemDTO> search(String keyword) {
			List<ItemEntity> list_entity = itemRepository.findByitemNameContaining(keyword);
			
			List<ItemDTO> list_e = new ArrayList<>();
			
			for(ItemEntity e:list_entity) {
				list_e.add(new ModelMapper().map(e, ItemDTO.class));
			}
			return list_e;
		}



}