<%--
  Created by IntelliJ IDEA.
  User: student
  Date: 10.12.2018
  Time: 11:45
  To change this template use File | Settings | File Templates.
--%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<html>
<head>
    <title>Nominate a member for the award</title>
</head>
<body>
<h1>Nominate a member for the award</h1>
<form:form modelAttribute="member">
    <div>First name: <form:input path="firstName"/></div>
    <div>Last name: <form:input path="lastName"/></div>
    <div><input type="submit" value="Submit"/></div>
</form:form>
</body>
</html>