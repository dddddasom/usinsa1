package kr.co.tj.reply;

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

@RestController
@RequestMapping("/api/reply")
public class ReplyController {
	
	@Autowired
	private ReplyService replyService;
		
	@GetMapping("/id/{id}")
	public ResponseEntity<?> findById(@PathVariable("id") Long id){
		Map<String, Object> map = new HashMap<>();
		
		if ( id == null) {
			map.put("result", "잘못된 접근입니다. 존재하지 않는 id입니다.");
			return ResponseEntity.badRequest().body(map);
		}
		
		try {
			ReplyDTO dto = replyService.findById(id);
			map.put("result", dto);
			return ResponseEntity.ok().body(map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			map.put("err", e.getMessage());
			return ResponseEntity.badRequest().body(map);
		}
	}
	
	@GetMapping("/all/{bid}")
	public ResponseEntity<?> findByBId(@PathVariable("bid") Long bid){
		Map<String, Object> map = new HashMap<>();
		
		if ( bid == null) {
			map.put("result", "잘못된 접근입니다. 존재하지 않는 bid입니다.");
			return ResponseEntity.badRequest().body(map);
		}
		
		try {
			List<ReplyDTO> list = replyService.findByBId(bid);
			map.put("result", list);
			return ResponseEntity.ok().body(map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			map.put("err", e.getMessage());
			return ResponseEntity.badRequest().body(map);
		}
	}
	
	@GetMapping("/bid")
	public ResponseEntity<?> listByBid(@RequestParam Long bid, @RequestParam int pageNum) {
	    Map<String, Object> map = new HashMap<>();
	    Page<ReplyDTO> page = replyService.findByBid(bid, pageNum);
	    map.put("result", page);
	    return ResponseEntity.ok().body(map);
	}
	
	
	
	@PostMapping({"", "/"})
	public ResponseEntity<?> insert(@RequestBody ReplyDTO replyDTO){
		Map<String, Object> map = new HashMap<>();
		
		if (replyDTO == null 
				|| replyDTO.getUsername() == null 
				|| replyDTO.getContent() == null
				|| replyDTO.getContent().equals("")) {
			map.put("result", "잘못된 접근입니다. replyDTO값이 존재하지 않습니다.");
			return ResponseEntity.badRequest().body(map);
		}
			
		try {
			replyDTO = replyService.insert(replyDTO);
			map.put("result", replyDTO);
			return ResponseEntity.ok().body(map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			map.put("err", e.getMessage());
			return ResponseEntity.badRequest().body(map);
		}	
	}
		
	@PutMapping({"", "/"})
	public ResponseEntity<?> update(@RequestBody ReplyDTO replyDTO){
		Map<String, Object> map = new HashMap<>();
		
		if (replyDTO == null 
				|| replyDTO.getId() == null
				|| replyDTO.getId() == 0L
				|| replyDTO.getUsername() == null 
				|| replyDTO.getContent() == null
				|| replyDTO.getContent().equals("")) {
			map.put("result", "잘못된 접근입니다. replyDTO값이 존재하지 않습니다.");
			return ResponseEntity.badRequest().body(map);
		}
	
		try {
			replyDTO = replyService.update(replyDTO);
			map.put("result", replyDTO);
			return ResponseEntity.ok().body(map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			map.put("err", e.getMessage());
			return ResponseEntity.badRequest().body(map);
		}
	}
	
	@DeleteMapping({"", "/"})
	public ResponseEntity<?> delete(@RequestBody ReplyDTO replyDTO){
		Map<String, Object> map = new HashMap<>();
		
		Long id = replyDTO.getId();
		
		if (replyDTO == null
				|| id == null
				|| id == 0L) {
			map.put("result", "잘못된 접근입니다. replyDTO값이 존재하지 않습니다.");
			return ResponseEntity.badRequest().body(map);
		}

		try {
			replyService.delete(id);
			map.put("result", replyDTO);
			return ResponseEntity.ok().body(map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			map.put("err", e.getMessage());
			return ResponseEntity.badRequest().body(map);
		}
	}
}
