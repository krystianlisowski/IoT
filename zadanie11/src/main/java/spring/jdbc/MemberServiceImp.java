package spring.jdbc;

import org.springframework.jdbc.core.namedparam.NamedParameterJdbcOperations;
import spring.model.Member;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.List;

public class MemberServiceImp implements MemberDao {
    private static final String FIND_ALL_SQL = "select firstName, lastName from roznosci.member";
    @Inject
    private NamedParameterJdbcOperations jdbcTemplate;
    @Inject private MemberRowMapper memberRowMapper;

    public List<Member> findAll() {
        System.out.println(jdbcTemplate);
        //System.out.println(jdbcTemplate.query(FIND_ALL_SQL, new HashMap<String, Object>(), memberRowMapper));
        return jdbcTemplate.query(FIND_ALL_SQL, new HashMap<String, Object>(), memberRowMapper);
    }
}
