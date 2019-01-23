package spring.jdbc;

import spring.model.Member;

import java.util.List;

public interface MemberDao {
    List<Member> findAll() throws Exception;
}
