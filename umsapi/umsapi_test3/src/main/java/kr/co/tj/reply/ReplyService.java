package kr.co.tj.reply;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class ReplyService {

	@Autowired
	private ReplyRepository replyRepository;
	
	public ReplyDTO findById(Long id) {
		Optional<ReplyEntity> optional = replyRepository.findById(id);
		
		if(!optional.isPresent()) {
			throw new RuntimeException("잘못된 접근입니다. 댓글 id가 존재하지 않습니다.");
		}
		
		ReplyEntity replyEntity = optional.get();
		
		return ReplyDTO.toReplyDTO(replyEntity);
	}
	
	public List<ReplyDTO> findByBId(Long bid) {
	
		List<ReplyEntity> list_entity = replyRepository.findByBid(bid);
		List<ReplyDTO> list_dto = new ArrayList<>();
		
		for (ReplyEntity e: list_entity) {
			list_dto.add(ReplyDTO.toReplyDTO(e));
		}

		return list_dto;
		
	}	
	
	public Page<ReplyDTO> findByBid(Long bid, int page) {
        List<Sort.Order> sortList = new ArrayList<>();
        sortList.add(Sort.Order.desc("id"));

        Pageable pageable = PageRequest.of(page, 5, Sort.by(sortList));
        Page<ReplyEntity> pageItem = replyRepository.findByBid(bid, pageable);
        Page<ReplyDTO> pageDto = pageItem.map(replyEntity -> new ReplyDTO(
                replyEntity.getId(),
                replyEntity.getUsername(),
                replyEntity.getContent(),
                replyEntity.getCreateDate(),
                replyEntity.getUpdateDate(),
                replyEntity.getBid()
        ));

        return pageDto;
    }
	
		
	public ReplyDTO insert(ReplyDTO replyDTO) {

		ReplyEntity replyEntity = replyDTO.toReplyEntity();
		
		Date date = new Date();
		replyEntity.setCreateDate(date);
		replyEntity.setUpdateDate(date);
		
		replyEntity = replyRepository.save(replyEntity);
				
		return ReplyDTO.toReplyDTO(replyEntity);
	}
	
	@Transactional
	public ReplyDTO update(ReplyDTO replyDTO) {

		Optional<ReplyEntity> optional = replyRepository.findById(replyDTO.getId());
		
		if(!optional.isPresent()) {
			throw new RuntimeException("잘못된 접근입니다. 댓글 id가 존재하지 않습니다.");
		}
		
		ReplyEntity replyEntity = optional.get();
		
		replyEntity.setContent(replyDTO.getContent());
		Date date = new Date();
		replyEntity.setUpdateDate(date);
		
		replyEntity = replyRepository.save(replyEntity);	
		return ReplyDTO.toReplyDTO(replyEntity);
	}
	
	
	@Transactional
	public void delete(Long id) {
		// TODO Auto-generated method stub
		
		replyRepository.deleteById(id);
		
	}

}
