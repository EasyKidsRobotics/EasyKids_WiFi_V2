#include <Arduino.h>
#include <vector>
#include <WiFi.h>
#include <Wire.h>
#include "Servo.h"
#include "SPI.h"

${EXTINC}
#include "TFT_eSPI.h" //for matrix led
TFT_eSPI tft = TFT_eSPI();

typedef int Number;
typedef int Boolean;
using namespace std;
Servo Servo1;
Servo Servo2;
Servo Servo3;
Servo Servo4;
#define _EN_A  22
#define _EN_B  12
#define _EN_C  16
#define _EN_D  17
#define _MotorA_ch  6
#define _MotorB_ch  7
#define _MotorC_ch  1
#define _MotorD_ch  0
int m1 = 0;
int m2 = 0;
int m3 = 0;
int m4 = 0;
int speedm = 0;

${VARIABLE}

${FUNCTION}


void setup()
{
Servo1.attach(19);
Servo2.attach(21);
Servo3.attach(5);
Servo4.attach(25);

ledcSetup(_MotorA_ch, 1000, 8);
ledcAttachPin(_EN_A, _MotorA_ch);
ledcSetup(_MotorB_ch, 1000, 8);
ledcAttachPin(_EN_B, _MotorB_ch);
ledcSetup(_MotorC_ch, 1000, 8);
ledcAttachPin(_EN_C, _MotorC_ch);
ledcSetup(_MotorD_ch, 1000, 8);
ledcAttachPin(_EN_D, _MotorD_ch);
  ${SETUP_CODE}
  ${BLOCKSETUP}
}
void loop()
{
  ${LOOP_CODE}
  ${LOOP_EXT_CODE}
}