<template>
  <v-app>
    <v-navigation-drawer
      fixed
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <v-layout column align-center>

            <h1>List Commentaries</h1>

            <table>
              <thead>
                <tr>
                  <th>
                    Nombre
                  </th>
                  <th>
                    Comentario
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="entry in datos">
                  <td>
                    {{entry.author}}
                  </td>
                  <td>
                    {{entry.text}}
                  </td>
                </tr>
              </tbody>
            </table>
            <blockquote>

            <v-form>
             <v-text-field
               label="Name"
               v-model="form.author"
               :counter="10"
               required
             ></v-text-field>

             <v-text-field
               label="Name"
               v-model="form.text"
               :counter="10"
               required
             ></v-text-field>

             <div>
              <v-btn color="primary" @click.native="save(form)">Primary</v-btn>
            </div>
          </v-form>
            </blockquote>
          </v-layout>
        </v-slide-y-transition>
      </v-container>
    </v-content>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
    >
      <v-list>
        <v-list-tile @click.native="right = !right">
          <v-list-tile-action>
            <v-icon>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import trae from 'trae'
  import socketIOClient from 'socket.io-client'
  import sailsIOClient from 'sails.io.js'

  var io = sailsIOClient(socketIOClient)

  io.sails.url = 'http://localhost:1337'

  export default {
    data () {
      return {
        datos: [],
        form: {
          author: '',
          text: ''
        },
        clipped: false,
        drawer: true,
        fixed: false,
        items: [{
          icon: 'bubble_chart',
          title: 'Inspire'
        }],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Vuetify.js',

        data: {}
      }
    },

    created () {
      this.index();

    },

    methods: {

      index: function () {
        var self = this

        io.socket.get('/message', function(datos) {
          self.datos = datos
        })

        io.socket.on('new message', function onServerSentEvent (msg) {
          self.datos.push(msg)
        })
      },
      save: (data) => {

        io.socket.post('/message', {
          author: data.author,
          text: data.text
        }, function (resData) {
          console.log(resData); // => 200
        });

      }
    }
  }
</script>
