package kr.pe.playdata.repository.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import kr.pe.playdata.domain.TouristAttraction;
import kr.pe.playdata.repository.TouristAttractionRepo;

@Service
@Component("TouristAttractionRepo")
public class TouristAttractionRepoImpl implements TouristAttractionRepo{
	@Autowired
	private TouristAttraction
	private enRepositoryCustom jcon2;
	
	@Override
	public String getCollectionName()
	{
		return collectionName;
	}
	
	@Override
	public void setCollectionName(String collectionName)
	{
		this.collectionName = collectionName;
	}
	
	@Override
	public List<TouristAttraction> findAll()
	{
		List<Notice> li = jcon2.findAll();
		return li;
	}
}
