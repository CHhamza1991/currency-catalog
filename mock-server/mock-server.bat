@echo off
REM available args
set HELP=help
set START=start

REM help
if "%1"=="%HELP%" (
	echo.
	echo    Usage: mock-server
	echo.
	echo    Command:
	echo.
	echo      help      output usage informations
	echo      start     runs json-server with pre-configured routes :
    echo.
    echo    Resources: 
    echo.
    echo        "http://localhost:3000/data"
    echo.
    echo    Home:
    echo.        
    echo        "http://localhost:3000"
	echo.
	goto exit
)

set options=
:read_args
if "%1"=="" goto run
if "%1"=="%START%" goto run
shift
goto read_args
:run
set CMD=node server.js
%CMD%
:exit