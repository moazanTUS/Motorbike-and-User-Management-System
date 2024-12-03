USE webdev3_2024;

-- Create motorbikes table
CREATE TABLE `motorbikes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `make` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `year` int(11) NOT NULL,
  `colour` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `cc` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

-- Insert data into motorbikes table
LOCK TABLES `motorbikes` WRITE;
INSERT INTO `motorbikes` VALUES
(1, 'Bike 1', 'Yamaha', 'YZF-R1', 2022, 'Blue', 'Sport', '998cc'),
(2, 'Bike 2', 'Honda', 'CBR600RR', 2021, 'Red', 'Sport', '599cc'),
(3, 'Bike 3', 'Kawasaki', 'Ninja ZX-10R', 2020, 'Green', 'Sport', '998cc'),
(4, 'Bike 4', 'Suzuki', 'GSX-R750', 2019, 'Black', 'Sport', '750cc'),
(5, 'Bike 5', 'Ducati', 'Panigale V4', 2022, 'Red', 'Sport', '1103cc'),
(6, 'Bike 6', 'BMW', 'S1000RR', 2020, 'White', 'Sport', '999cc'),
(7, 'Bike 7', 'Harley-Davidson', 'Street Glide', 2021, 'Black', 'Cruiser', '1746cc'),
(8, 'Bike 8', 'Triumph', 'Bonneville T120', 2018, 'Silver', 'Classic', '1200cc'),
(9, 'Bike 9', 'KTM', 'Duke 390', 2021, 'Orange', 'Naked', '373cc'),
(10, 'Bike 10', 'Royal Enfield', 'Interceptor 650', 2019, 'Silver', 'Classic', '648cc'),
(11, 'Bike 11', 'Aprilia', 'RSV4', 2020, 'Black', 'Sport', '1100cc'),
(12, 'Bike 12', 'Yamaha', 'MT-09', 2021, 'Blue', 'Naked', '847cc'),
(13, 'Bike 13', 'Honda', 'CB500X', 2020, 'Green', 'Adventure', '471cc'),
(14, 'Bike 14', 'Kawasaki', 'Versys 650', 2019, 'White', 'Adventure', '649cc'),
(15, 'Bike 15', 'Suzuki', 'V-Strom 1050', 2021, 'Yellow', 'Adventure', '1037cc'),
(16, 'Bike 16', 'Harley-Davidson', 'Fat Boy', 2022, 'Black', 'Cruiser', '1868cc'),
(17, 'Bike 17', 'Ducati', 'Multistrada V4', 2021, 'Red', 'Adventure', '1158cc'),
(18, 'Bike 18', 'BMW', 'R1250GS', 2020, 'Blue', 'Adventure', '1254cc'),
(19, 'Bike 19', 'Triumph', 'Speed Triple 1200 RS', 2021, 'Black', 'Naked', '1160cc'),
(20, 'Bike 20', 'KTM', '1290 Super Duke R', 2022, 'Orange', 'Naked', '1301cc');
UNLOCK TABLES;

-- Create users table
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

-- Insert data into users table
LOCK TABLES `users` WRITE;
INSERT INTO `users` VALUES
(1, 'Liam O\'Connor', 'liam.oconnor', 'bikepass1', 'img1.jpg'),
(2, 'Emma Gallagher', 'emma.g', 'ridefast2022', 'img2.jpg'),
(3, 'Noah Murphy', 'noah.murphy', 'twowheels123', 'img3.jpg'),
(4, 'Ava Walsh', 'ava.walsh', 'speedqueen', 'img4.jpg'),
(5, 'James Ryan', 'j.ryan', 'motoguru', 'img5.jpg'),
(6, 'Sophie Kelly', 'sophie.kelly', 'racerlife', 'img6.jpg'),
(7, 'Oliver Doyle', 'oliver.doyle', 'biker123', 'img7.jpg'),
(8, 'Isabella Byrne', 'isabella.b', 'roadqueen', 'img8.jpg'),
(9, 'Lucas Moore', 'lucas.moore', 'race2win', 'img9.jpg'),
(10, 'Mia McCarthy', 'mia.mc', 'passionforrides', 'img10.jpg'),
(11, 'Ethan Byrne', 'ethan.byrne', 'bikeready', 'img11.jpg'),
(12, 'Grace O\'Sullivan', 'grace.osullivan', 'throttleup', 'img12.jpg'),
(13, 'Jacob Collins', 'jacob.collins', 'riderforlife', 'img13.jpg'),
(14, 'Emily Hughes', 'emily.hughes', 'motolove', 'img14.jpg'),
(15, 'Michael O\'Brien', 'michael.obrien', 'superbiker', 'img15.jpg'),
(16, 'Charlotte Murphy', 'charlotte.m', 'wheelspin', 'img16.jpg'),
(17, 'Daniel Walsh', 'daniel.w', 'riderpass123', 'img17.jpg'),
(18, 'Chloe Dunne', 'chloe.d', 'motoenthusiast', 'img18.jpg'),
(19, 'Matthew Flynn', 'matthew.f', 'fastlane2021', 'img19.jpg'),
(20, 'Amelia Nolan', 'amelia.n', 'wildride2022', 'img20.jpg');
UNLOCK TABLES;
