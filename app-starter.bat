@echo off
REM available args
set IE=-ie
set MOCK=mock
set HELP=help

REM help
if "%1"=="%HELP%" (
	echo.
	echo    Usage: app-starter 
	echo.
	echo    Command:
	echo.
	echo      help      output usage informations
	echo      mock      runs ng serve with configuration=mock
	echo.
	echo    Options:
	echo.
	echo      -ie       runs ng serve with --no-live-reload option which is mandatory for IE10
	echo.
	goto exit
)

set options=
:read_args
if "%1"=="" goto run
if "%1"=="%IE%" set options=%options% --no-live-reload
if "%1"=="%MOCK%" set options=%options% --configuration=mock
shift
goto read_args
:run
set CMD=yarn run start --port=8000 %options%
%CMD%
:exit