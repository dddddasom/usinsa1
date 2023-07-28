package kr.co.tj.auth;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.tj.member.MemberDTO;
import kr.co.tj.member.MemberService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	
	@Autowired
	private MemberService memberService;
	
	@GetMapping("/checkid")
	public ResponseEntity<?> checkId(String username) {
		Map<String, Object> map = new HashMap<>();
		map.put("result", memberService.checkByUsername(username));
		return ResponseEntity.ok().body(map);
		
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody MemberDTO dto){
		Map<String, Object> map = new HashMap<>();
		
		if(dto == null) {
			map.put("result", "잘못된 데이터");
			return ResponseEntity.badRequest().body(map);		
		}
		
		if(dto.getUsername() == null || dto.getUsername().equals("")) {
			map.put("result", "잘못된 데이터");
			return ResponseEntity.badRequest().body(map);		
		}
		
		if(dto.getPassword() == null || dto.getPassword().equals("")) {
			map.put("result", "잘못된 데이터");
			return ResponseEntity.badRequest().body(map);		
		}
		
		try {
			dto = memberService.login(dto);
			map.put("result", dto);
			return ResponseEntity.ok().body(map);
			
		} catch (Exception e) {
			e.printStackTrace();
			map.put("result", "로그인 실패");
			return ResponseEntity.badRequest().body(map);
		}
		
	}

	@PostMapping("/insert")
	public ResponseEntity<?> insert(@RequestBody MemberDTO dto) {
		Map<String, Object> map = new HashMap<>();

		if (dto == null) {
			map.put("result", "에러발생1");
			return ResponseEntity.badRequest().body(map);
		}
		if (dto.getPassword() == null) {
			map.put("result", "에러발생2");
			return ResponseEntity.badRequest().body(map);
		}
		if (dto.getPassword2() == null) {
			map.put("result", "에러발생3");
			return ResponseEntity.badRequest().body(map);
		}
		if (!dto.getPassword().equals(dto.getPassword2())) {
			map.put("result", "에러발생4");
			return ResponseEntity.badRequest().body(map);
		}
		if (dto.getUsername() == null) {
			map.put("result", "에러발생5");
			return ResponseEntity.badRequest().body(map);
		}
		if (dto.getName() == null) {
			map.put("result", "에러발생6");
			return ResponseEntity.badRequest().body(map);
		}

		try {
			dto = memberService.insert(dto);
			map.put("result", dto);
			return ResponseEntity.ok().body(map);

		} catch (Exception e) {
			e.printStackTrace();
			map.put("result", "입력 실패");
			return ResponseEntity.badRequest().body(map);
		}

	}

}
