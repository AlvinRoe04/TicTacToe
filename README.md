# TicTacToe

This project was about utilizing IIFEs and Factories. The only time I really utilized a factory was to create the players. Otherwise, there wasn't much of an opportunity. Honestly, it was probably unneccessary.

The IIFE modules were much handier. At first I built the project without them and it was far messier. The code stucture could use some improvment to separate out responsibilities, however it is far better than it began. 

Some things that can be improved:
-UX/UI Design
-Code Structure. Right now there is a Game Board module and a Game Manager module. The Game Manager module manages the players. It should probably be renamed.
-On top of that, the Game Board Module is responsible for far too much. It should have far clearer responsibilities, and it should probably be split into multiple modules. 