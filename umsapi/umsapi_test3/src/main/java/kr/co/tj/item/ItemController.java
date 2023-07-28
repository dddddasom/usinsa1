package kr.co.tj.item;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.tj.reply.ReplyDTO;


@RestController
@RequestMapping("/api/item")
public class ItemController {
	@Autowired
	private ItemService itemService;
	
	@GetMapping("/id/{id}")
	public ResponseEntity<?> findById(@PathVariable("id") Long id) {
		
		Map<String, Object> map = new HashMap<>();

		if (id == null) {
			map.put("result", "잘못된 정보입니다.");
			return ResponseEntity.badRequest().body(map);
		}

		try {
			ItemDTO dto = itemService.findById(id);
			map.put("result", dto);
			return ResponseEntity.ok().body(map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			map.put("result", "오류발생");
			return ResponseEntity.badRequest().body(map);
		}
	}
	
	@GetMapping("/all")
	public ResponseEntity<?> findAll() {
		
		Map<String, Object> map = new HashMap<>();

		try {
			List<ItemDTO> list = itemService.findAll();
			map.put("list", list);
			return ResponseEntity.ok().body(map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			map.put("err", "에러 발생");
			return ResponseEntity.badRequest().body(map);
		}
	}
	
	@GetMapping("/list")
	public ResponseEntity<?> list(int pageNum) {
		
		Map<String, Object> map = new HashMap<>();
		
		Page<ItemDTO> page = itemService.findAll(pageNum);
		map.put("result", page);

		return ResponseEntity.ok().body(map);
	}
	
	@GetMapping("/list/itemtype/{itemType}")
	public ResponseEntity<?> findByItemType(@PathVariable("itemType") String itemType){
		Map<String, Object> map = new HashMap<>();
		
		if ( itemType == null) {
			map.put("result", "잘못된 접근입니다.");
			return ResponseEntity.badRequest().body(map);
		}
		
		try {
			List<ItemDTO> list = itemService.findByItemType(itemType);
			map.put("result", list);
			return ResponseEntity.ok().body(map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			map.put("err", e.getMessage());
			return ResponseEntity.badRequest().body(map);
		}
	}
	
	@GetMapping("/itemtype/itemtype")
	public ResponseEntity<?> listByItemType(@RequestParam String itemType, @RequestParam int pageNum){
		Map<String, Object> map = new HashMap<>();
		
		Page<ItemDTO> page = itemService.findByItemType(itemType, pageNum);
		map.put("result", page);

		return ResponseEntity.ok().body(map);
	}

	
   @GetMapping("/list/username/{username}")
   public ResponseEntity<?> itemListOfStaff(@PathVariable("username") String username){
      Map<String, Object> map = new HashMap<>();
      
      try {
         List<ItemDTO> list = itemService.itemListOfStaff(username);
         map.put("result", list);
         return ResponseEntity.ok().body(map);
      } catch (Exception e) {
         e.printStackTrace();
         map.put("result", "해당 스태프의 리스트를 가져오지 못했습니다.");
         return ResponseEntity.badRequest().body(map);
      }
   }
   
   @GetMapping("/list/username/search")
   public ResponseEntity<?> list(@RequestParam("username")String username, @RequestParam("pageNum") int pageNum) {
      Map<String, Object> map = new HashMap<>();
      Page<ItemDTO> page = itemService.findAll(username, pageNum);
      map.put("result", page);

      return ResponseEntity.ok().body(map);
   }

   
//   @GetMapping("/search/{keyword}")
//   public ResponseEntity<?> search(@PathVariable("keyword") String keyword){
//	   Map<String, Object> map = new HashMap<>();
//		
//		try {
//			List<ItemDTO> list = itemService.search(keyword);
//			map.put("result", list);
//			return ResponseEntity.ok().body(map);
//		} catch (Exception e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//			map.put("err", e.getMessage());
//			return ResponseEntity.badRequest().body(map);
//		}
//   }
   
	@GetMapping("/search/{keyword}")
	public ResponseEntity<?> search(@PathVariable("keyword") String keyword){
		Map<String, Object> map = new HashMap<>();
		
		try {
			List<ItemDTO> list = itemService.search(keyword);
			map.put("result", list);
			return ResponseEntity.ok().body(map);
		} catch (Exception e) {
			e.printStackTrace();
			map.put("result", "에러");
			return ResponseEntity.badRequest().body(map);
		}
	}

   
	
	@PostMapping("")
	public ResponseEntity<?> insert(@RequestBody ItemDTO dto) {
		
		Map<String, Object> map = new HashMap<>();

		if (dto == null
				|| dto.getItemName() == null
				|| dto.getPrice() == 0L
				|| dto.getEa() == 0
				|| dto.getItemDescribe() == null
				|| dto.getItemDescribe() == ""
				|| dto.getItemType() == null
				|| dto.getItemType() == "") {
			map.put("result", "잘못된 데이터");
			return ResponseEntity.badRequest().body(map);
		}

		try {
			dto = itemService.insert(dto);
			map.put("result", dto);
			return ResponseEntity.ok().body(map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			map.put("result", "등록 실패");
			return ResponseEntity.badRequest().body(map);
		}
	}

	@PutMapping("")
	public ResponseEntity<?> update(@RequestBody ItemDTO dto) {
		
		Map<String, Object> map = new HashMap<>();
		
		if (dto == null
				|| dto.getItemName() == null
				|| dto.getPrice() == 0L
				|| dto.getEa() == 0
				|| dto.getItemDescribe() == null
				|| dto.getItemDescribe() == ""
				|| dto.getItemType() == null
				|| dto.getItemType() == "") {
			map.put("result", "잘못된 정보입니다.");
			return ResponseEntity.badRequest().body(map);
		}

		try {
			dto = itemService.update(dto);
			map.put("result", dto);
			return ResponseEntity.ok().body(map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			map.put("result", "수정 시루떡");
			return ResponseEntity.badRequest().body(map);
		}
	}
	
	
	@DeleteMapping("")
	public ResponseEntity<?> delete(@RequestBody ItemDTO itemDTO) {
		
		Map<String, Object> map = new HashMap<>();
		
		Long id = itemDTO.getId();
		
		if (itemDTO == null 
				|| id == null
				|| id == 0L) {
			map.put("result", "잘못된 정보입니다.");
			return ResponseEntity.badRequest().body(map);
		}

		try {
			itemService.delete(id);
			map.put("result", "삭제 성공이요");
			return ResponseEntity.ok().body(map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			map.put("result", "삭제 실패");
			return ResponseEntity.badRequest().body(map);
		}
	}


}
