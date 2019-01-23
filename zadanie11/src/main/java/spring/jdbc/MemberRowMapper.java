package spring.jdbc;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;
import spring.model.Member;

import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class MemberRowMapper implements RowMapper<Member> {

    @Override
    public Member mapRow(ResultSet resultSet, int rowNum) throws SQLException {
        Member member = new Member();
        member.setFirstName(resultSet.getString(1));
        member.setLastName(resultSet.getString(2));
        return member;
    }
}
