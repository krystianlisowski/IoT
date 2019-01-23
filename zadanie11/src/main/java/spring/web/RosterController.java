package spring.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import spring.jdbc.MemberDao;
import spring.model.Member;

@Controller("/roster/*")
public final class RosterController {
    private List<Member> members;
    @Autowired
    private MemberDao memberDao;

    public void setMemberDao(MemberDao memberDao) {
        this.memberDao = memberDao;
    }

    public RosterController() {
        /*members.add(new Member("John", "Lennon"));
        members.add(new Member("Paul", "McCartney"));
        members.add(new Member("George", "Harrison"));
        members.add(new Member("Ringo", "Starr"));*/
    }

    @RequestMapping(value="/roster/list**", method = RequestMethod.GET)
    public void list(Model model) throws Exception {
        members = memberDao.findAll();
        model.addAttribute(members);
        //W JSP można będzie je pobrać za pomocą wyrażenia ${memberList}
    }
    
    @RequestMapping(value="/roster/member**", method = RequestMethod.GET)
    public void member(@RequestParam("id") Integer id, Model model) {
        model.addAttribute(members.get(id));
    }
}