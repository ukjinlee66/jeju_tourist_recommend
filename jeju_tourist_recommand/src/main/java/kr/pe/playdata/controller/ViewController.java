package kr.pe.playdata.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class ViewController {
    @GetMapping("/")
    public String home(){
        return "home";
    }

    @GetMapping("search")
    public String searchPage(@RequestParam String searchKey,Model model){
        model.addAttribute("searchKey", searchKey);
        return "search";
    }

    @GetMapping("recommand")
    public String recommandPage(@RequestParam List<String> recommandList, Model model){
        model.addAttribute("recommandList", recommandList);
        return "recommand";
    }
}