import { McpServer, type ToolCallback } from '@modelcontextprotocol/sdk/server/mcp'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio'
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse'
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp'
import { z, type ZodRawShape } from 'zod'
import express from 'express'
import minimist from 'minimist'

const server = new McpServer({
  name:'',
  version:'',
  description:''
})

const createMobilePaymentParamsSchema = {
  way: z.enum(['alipay', 'wechat pay']).describe('')
}

const createMobilePayment: ToolCallback = async (args, extra) => {
  if (!extra.sessionId) {
    return {
      content:[{type:'text', text:''}]
    }
  }

  return {
    content:[]
  }
}

server.tool(
  'create_mobile_payment', 
  '',
  createMobilePaymentParamsSchema,
  createMobilePayment
)

async function bootstrap(transport:'stdio'|'sse'|'streamableHttp') {
  let serverTransport = new StdioServerTransport()

  if (transport === 'sse') {
    const app = express()

    app.get('/sse', async (req, res) => {

    })

  } else if(transport === 'streamableHttp') {

  }

  await server.connect(serverTransport)
}

const commandArgs = minimist(process.argv.slice(2))

bootstrap(commandArgs['transport'] || 'stdio')

