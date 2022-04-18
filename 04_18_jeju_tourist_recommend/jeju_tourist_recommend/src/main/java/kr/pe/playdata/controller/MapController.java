package kr.pe.playdata.controller;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import kr.pe.playdata.domain.VisitJejuLocation;
import kr.pe.playdata.service.MapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Metrics;
import org.springframework.data.geo.Point;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/map")
public class MapController {
    /*
        맵 컨트롤러
     */

    @Autowired
    private MapService locationService;

    @ApiOperation(value = "관광지 이름으로 검색", notes = "관광지 이름으로 조회하여 위치를 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK !!"),
            @ApiResponse(code = 404, message = "404 에러 발생, Not Found !"),
            @ApiResponse(code = 500, message = "500 에러 발생, Internal Server Error !")
    })
    @GetMapping("/findBySource")
    public Optional<VisitJejuLocation> findBySource(
            @ApiParam(value = "관광지 이름", required=false, example = "우도(해양도립공원)")
            @RequestParam String source){
        return locationService.findBySource(source);
    }


    @ApiOperation(value = "관광지 이름으로 주변 관광지 검색", notes = "관광지 이름으로 주변 관공지를 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK !!"),
            @ApiResponse(code = 404, message = "404 에러 발생, Not Found !"),
            @ApiResponse(code = 500, message = "500 에러 발생, Internal Server Error !")
    })
    @GetMapping("/findNear")
    public List<VisitJejuLocation> findNear(
            @ApiParam(value = "경도", required=false, example = "126.8990639")
            @RequestParam String longtitude,
            @ApiParam(value = "위도", required=false, example = "33.4397")
            @RequestParam String latitude,
            @ApiParam(value = "반경", required=false, example = "1")
            @RequestParam double distance
    ){
        Point p = new Point(Double.valueOf(longtitude), Double.valueOf(latitude));
        Distance d = new Distance(distance, Metrics.KILOMETERS);
        List<VisitJejuLocation> li = locationService.findNear(p,d);
        return li;
    }
}