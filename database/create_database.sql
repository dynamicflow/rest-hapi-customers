CREATE TABLE customers (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(100),
  email varchar(100),
  address1 varchar(100),
  address2 varchar(100),
  city varchar(100),
  state char(2),
  country char(2),
  latitude double,
  longitude double,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

CREATE TABLE tokens (
  token char(32) NOT NULL,
  name varchar(100),
  user varchar(100),
  scope varchar(100),
  PRIMARY KEY (token)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO tokens VALUES ('3f0c061549010bc70447efbef04fa0a8','Alessandro Oliveira','alessandro@dynamicflow.com.br','user');