const dirIcon = Vue.prototype.$global.board.board_info.dir;
module.exports = {
    blocks: [ // use "blocks : [ " in normally situation but this need to override base block from esp-idf platforms
        {
            name: "Neopixel",
            color: "230",
            //icon: "/static/icons/icons8_picture_96px_1.png",
            icon: `file:///${dirIcon}/static/icons/RGB.png`,
            blocks: [
                {
                    xml:
                        `<block type="neopixel_rgb_begin">
                  <value name="PIN">
                      <shadow type="math_number">
                          <field name="NUM">33</field>
                      </shadow>
                  </value>
                  <value name="NUM">
                      <shadow type="math_number">
                          <field name="NUM">8</field>
                      </shadow>
                  </value>
              </block>`
                },
                'neopixel_rgb_clear',
                {
                    xml:
                        `<block type="neopixel_rgb_setBrightness">
                  <value name="BRIGHT">
                      <shadow type="math_number">
                          <field name="NUM">20</field>
                      </shadow>
                  </value>
              </block>`
                },
                {
                    xml:
                        `<block type="neopixel_rgb_setPixelColor">
                  <value name="NUM">
                      <shadow type="math_number">
                          <field name="NUM">0</field>
                      </shadow>
                  </value>
              </block>`
                },
                {
                    xml:
                        `<block type="neopixel_rgb_setPixelvar">
                <value name="NUM">
                    <shadow type="math_number">
                        <field name="NUM">0</field>
                    </shadow>
                </value>
                <value name="red">
                    <shadow type="math_number">
                        <field name="NUM">0</field>
                    </shadow>
                </value>
                <value name="green">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
                </value>
                <value name="blue">
                    <shadow type="math_number">
                      <field name="NUM">0</field>
                </shadow>
                </value>
            </block>`
                },
                'neopixel_rgb_fillLED',
                // 'neopixel_rgb_fillLEDvar',
                {
                    xml:
                        `<block type="neopixel_rgb_colorWipe">
                  <value name="TIME">
                      <shadow type="math_number">
                          <field name="NUM">100</field>
                      </shadow>
                  </value>
              </block>`
                },
                {
                    xml:
                        `<block type="neopixel_rgb_theaterChase">
                  <value name="TIME">
                      <shadow type="math_number">
                          <field name="NUM">100</field>
                      </shadow>
                  </value>
              </block>`
                },
                'neopixel_rgb_rainbow_begin',
                {
                    xml:
                        `<block type="neopixel_rgb_rainbow">
                  <value name="TIME">
                      <shadow type="math_number">
                          <field name="NUM">25</field>
                      </shadow>
                  </value>
              </block>`
                },
                {
                    xml:
                        `<block type="neopixel_rgb_rainbowCycle">
                  <value name="TIME">
                      <shadow type="math_number">
                          <field name="NUM">25</field>
                      </shadow>
                  </value>
              </block>`
                }
            ]
        },
        {
            name: "LCD Display",
            color: "230",
            icon: `file:///${dirIcon}/static/icons/LCDdisplay.PNG`,
            blocks: [
                {
                    xml: `<sep gap="32"></sep><label text="LCD TFT 1.54 inch 240x240 Pixels" web-class="headline"></label>`
                },
                {
                    xml: `<block type="variables_set">
                                     <field name="VAR">img1</field>
                                     <value name="VALUE">
                                         <block type="i2c128x64_create_image" inline="false"></block>
                                     </value>
                                 </block>`
                },
                {
                    xml:
                        `<block type="i2c128x64_display_image">
                             <value name="img">
                                 <block type="variables_get">
                                     <field name="VAR">img1</field>
                                 </block>
                             </value>
                             <value name="x">
                                 <shadow type="math_number">
                                     <field name="NUM">0</field>
                                 </shadow>
                             </value>
                             <value name="x">
                                 <shadow type="math_number">
                                     <field name="NUM">0</field>
                                 </shadow>
                             </value>
                             <value name="y">
                                 <shadow type="math_number">
                                     <field name="NUM">0</field>
                                 </shadow>
                             </value>
                             <value name="width">
                                 <shadow type="math_number">
                                     <field name="NUM">240</field>
                                 </shadow>
                             </value>
                             <value name="height">
                                 <shadow type="math_number">
                                     <field name="NUM">240</field>
                                 </shadow>
                             </value>
                         </block>`
                },
                "tft_display_setRotation",
                "tft_display_fillScreen",
                //'basic_TFT_setFonts',
                {
                    xml:
                        `<block type="tft_display_print">
                            <value name="TEXT">
                                <shadow type="basic_string">
                                    <field name="VALUE">Hello world!</field>
                                </shadow>
                            </value>
                            <value name="X">
                                <shadow type="math_number">
                                    <field name="NUM">0</field>
                                </shadow>
                            </value>
                            <value name="Y">
                                <shadow type="math_number">
                                    <field name="NUM">0</field>
                                </shadow>
                            </value>
                        </block>`
                },
                {
                    xml:
                        `<block type='basic_TFT_print_TH'>
                            <value name="TEXT">
                                <shadow type="basic_string">
                                    <field name="VALUE">Hello world!</field>
                                </shadow>
                            </value>
                            <value name="X">
                                <shadow type="math_number">
                                    <field name="NUM">0</field>
                                </shadow>
                            </value>
                            <value name="Y">
                                <shadow type="math_number">
                                    <field name="NUM">0</field>
                                </shadow>
                            </value>
                        </block>`
                },
                {
                    xml: `<sep gap="32"></sep><label text="Shape" web-class="headline"></label>`
                },
                {
                    xml:
                        `<block type="tft_display_draw_line">
                            <value name="x0">
                                <shadow type="math_number">
                                    <field name="NUM">10</field>
                                </shadow>
                            </value>
                            <value name="y0">
                                <shadow type="math_number">
                                    <field name="NUM">10</field>
                                </shadow>
                            </value>
                            <value name="x1">
                                <shadow type="math_number">
                                    <field name="NUM">100</field>
                                </shadow>
                            </value>
                            <value name="y1">
                                <shadow type="math_number">
                                    <field name="NUM">50</field>
                                </shadow>
                            </value>
                        </block>`
                },
                {
                    xml:
                        `<block type="tft_display_draw_rect">
                            <value name="x">
                                <shadow type="math_number">
                                    <field name="NUM">10</field>
                                </shadow>
                            </value>
                            <value name="y">
                                <shadow type="math_number">
                                    <field name="NUM">10</field>
                                </shadow>
                            </value>
                            <value name="width">
                                <shadow type="math_number">
                                    <field name="NUM">50</field>
                                </shadow>
                            </value>
                            <value name="height">
                                <shadow type="math_number">
                                    <field name="NUM">30</field>
                                </shadow>
                            </value>
                        </block>`
                },
                {
                    xml:
                        `<block type="tft_display_draw_circle">
                            <value name="x">
                                <shadow type="math_number">
                                    <field name="NUM">64</field>
                                </shadow>
                            </value>
                            <value name="y">
                                <shadow type="math_number">
                                    <field name="NUM">32</field>
                                </shadow>
                            </value>
                            <value name="r">
                                <shadow type="math_number">
                                    <field name="NUM">20</field>
                                </shadow>
                            </value>
                        </block>`
                },
                {
                    xml:
                        `<block type="i2c128x64_display_draw_pixel">
                              <value name="x">
                                  <shadow type="math_number">
                                      <field name="NUM">0</field>
                                  </shadow>
                              </value>
                              <value name="y">
                                  <shadow type="math_number">
                                      <field name="NUM">0</field>
                                  </shadow>
                              </value>
                          </block>`
                },
                "basic_string"
            ]
        },

        {
            name: "App Control",
            color: "58",
            icon: `file:///${dirIcon}/static/icons/REMOTE.png`,
            blocks: [
                {
                    xml: `<sep gap="32"></sep><label text="RemoteXY:App" web-class="headline"></label>`
                },
                "remote_xy_begin",
                "remote_xy_robot_run",
                "remote_xy_run",
                "remote_xy_get",
            ]
        },

        {
            name: "EasyKids-WiFi",
            color: "58",
            icon: `file:///${dirIcon}/static/icons/easy.png`, 
            blocks: [
                {
                    xml: `<sep gap="32"></sep><label text="EasyKids: Input/Output" web-class="headline"></label>`
                },
                {
                    xml:
                        // `<block type="easykbbegin">
                        //  </block>
                        `<block type="easykb_setuppin">
                 </block>
                 <block type="easykb_writeio">
                 </block>
                 <block type="easykb_readio">
                 </block>
                 <block type="easykb_readadc">
                 </block>
                 <block type="easykb_readsw">
                 </block>`
                },
                {
                    xml:
                    `<block type="easykb_sw">
                    </block>`
                },
                {
                    xml : 
                    `<block type="easykb_vr">
                        <value name="pin">
                            <shadow type="math_number">
                                <field name="NUM">0</field>
                            </shadow>
                        </value>
                    </block>`
                },
                {
                    xml: `<sep gap="32"></sep><label text="EasyKids: Motor Control" web-class="headline"></label>`
                },

            //     {
            //         xml:
            //             `<block type="easy_dc_init">

            //     <value name="ENA">
            //         <block type="math_number">
            //             <field name="NUM">16</field>
            //         </block>
            //     </value>

            //     <value name="ENB">
            //         <block type="math_number">
            //             <field name="NUM">17</field>
            //         </block>
            //     </value>

            //     <value name="ENC">
            //         <block type="math_number">
            //             <field name="NUM">18</field>
            //         </block>
            //     </value>

            //     <value name="END">
            //         <block type="math_number">
            //          <field name="NUM">19</field>
            //     </block>
            //     </value>

            // </block>`
            //     },
            {
                xml:
                    `<block type="easy_motor_forward">
                <value name="SPEED1">
                    <shadow type="math_number">
                        <field name="NUM">50</field>
                    </shadow>
                </value>
                <value name="SPEED2">
                    <shadow type="math_number">
                        <field name="NUM">50</field>
                    </shadow>
                </value>
            </block>`
            },
            
                {
                    xml:
                        `<block type="easy_dc_forward">
                <value name="SPEED">
                    <shadow type="math_number">
                        <field name="NUM">50</field>
                    </shadow>
                </value>
            </block>`
                },
                {
                    xml:
                        `<block type="easy_dc_forward2">
                <value name="SPEED">
                    <shadow type="math_number">
                        <field name="NUM">50</field>
                    </shadow>
                </value>
            </block>`
                },
                {
                    xml:
                        `<block type="easy_motor_backward">
                <value name="SPEED1">
                        <shadow type="math_number">
                            <field name="NUM">50</field>
                        </shadow>
                    </value>
                    <value name="SPEED2">
                        <shadow type="math_number">
                            <field name="NUM">50</field>
                    </shadow>
                </value>
            </block>`
                },
                {
                    xml:
                        `<block type="easy_dc_backward">
                <value name="SPEED">
                    <shadow type="math_number">
                        <field name="NUM">50</field>
                    </shadow>
                </value>
            </block>`
                },
                {
                    xml:
                        `<block type="easy_dc_backward2">
                <value name="SPEED">
                    <shadow type="math_number">
                        <field name="NUM">50</field>
                    </shadow>
                </value>
            </block>`
                },
                {
                    xml:
                        `<block type="easykb_spinleft">
                <value name="SPEED">
                    <shadow type="math_number">
                        <field name="NUM">50</field>
                    </shadow>
                </value>
            </block>`
                },
                {
                    xml:
                        `<block type="easykb_spinright">
                <value name="SPEED">
                        <shadow type="math_number">
                            <field name="NUM">50</field>
                        </shadow>
                </value>
            </block>`
                },
                {
                    xml:
                        `<block type="easykb_motor1_stop">
            </block>`
                },
                {
                    xml:
                        `<block type="easykb_motor2_stop">
            </block>`
                },
                {
                    xml:
                        `<block type="easymotorstopall">
                 </block>`
                },
                {
                    xml: `<sep gap="32"></sep><label text="EasyKids: Servo Control" web-class="headline"></label>`
                },
                {
                    xml:
                        `<block type="easykb_servo">
                <value name="value">
                        <shadow type="math_number">
                    <field name="NUM">90</field>
                        </shadow>
                </value>
            </block>`
            },

                
                // "easy_dc_free",
            //     {
            //         xml:
            //             `<block type="easykb_pwm_write">
            //     <value name="value">
            //         <shadow type="math_number">
            //             <field name="NUM">100</field>
            //         </shadow>
            //     </value>
            // </block>`
            //     },
                
                
            ]
        },
        // {
        //     name: "Servo",
        //     color: "58",
        //     icon: `file:///${dirIcon}/static/icons/servo.png`,
        //     blocks: [
        //         "esp32_servo_attach",
        //         "esp32_servo_detach",
        //         "esp32_servo_write",
        //         "esp32_servo_write_micros",
        //         "esp32_servo_read",
        //         "esp32_servo_read_micros"
        //     ]
        // },
        // {
        //   name: "MQTT",
        //   color: "230",
        //   icon: `file:///${dirIcon}/static/icons/mqtt.png`,
        //   blocks: [
        //      "mqtt_connector_begin",
        //      "on_prepare_data",
        //      "on_message",
        //      "append_value",
        //      "mqtt_connect"
        //   ]
        // },
        {
            name: "JoyStick",
            color: "30",
            icon: `file:///${dirIcon}/static/icons/Joystick.png`,
            blocks: [
                {
                    xml: `<sep gap="32"></sep><label text="Robot : ESP-NOW" web-class="headline"></label>`
                },
                "Robot_Setup",
                "Read_Mac_Address",
                
                {
                    xml: `<sep gap="32"></sep><label text="JoyStick : ESP-NOW" web-class="headline"></label>`
                },
                
                {
                    xml : 
                        `<block type="JoyStick_Setup">
                            <value name="text">
                                <shadow type="basic_string">
                                    <field name="VALUE">ff:ff:ff:ff:ff:ff</field>
                                </shadow>
                            </value>
                        </block>`
                },
            ]
        },
        {
            name: "GPIO",
            color: "30",
            icon: "/static/icons/icons8_electronics_96px.png",
            blocks: [
                {
                    xml: `<sep gap="32"></sep><label text="Board GPIO" web-class="headline"></label>`
                },
                "output_write",
                "output_toggle",
                "output_read",
                // "usbsw_write",
                // "usbsw_toggle",
                // "usbsw_read",
                "input_read"
            ]
        },
        {
            name: "Time",
            color: "330",
            icon: "/static/icons/SVG/c6.svg",
            blocks: [
                {
                    xml:
                        `<block type="time_delay">
                        <value name="delay">
                            <shadow type="math_number">
                                <field name="NUM">1000</field>
                            </shadow>
                        </value>
                    </block>`
                },

                {
                    xml:
                        `<block type="time_delay_microsec">
                        <value name="delay">
                            <shadow type="math_number">
                                <field name="NUM">1000</field>
                            </shadow>
                        </value>
                    </block>`
                },

            ]
        }
    ]
};
