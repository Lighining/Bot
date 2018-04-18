import discord
from discord.ext import commands
import asyncio

bot = commands.Bot("/")

@bot.event
async def on_ready():
    print("Bot is online Run /ping to make sure i'm fully working!")


@bot.command(pass_context=True)
async def ping(ctx):
    await bot.say(":ping_pong: Pong! :tada:")
    print("User has pinged!")


@bot.command(pass_context=True)
async def hello(ctx):
    await bot.say("hi :wave: How's it goin")

@bot.command(pass_context=True)
async def flipcoin(ctx):
    pick = ['Tails','Heads']
    flip = random.choice(pick)
    await bot.say ("The coin landed on " + flip + '!')

@bot.command(pass_context=True)
@commands.has_role("Staff")
async def kick(ctx, user: discord.Member):
    await bot.say(":boot: Cya, {}. Ya loser!".format(user.name))
    await bot.kick(user)

@bot.command(pass_context=True)
@commands.has_role("Staff")
async def ban(ctx, user: discord.Member):
    await bot.say(":boot: Off my lawn, {}. Ya loser!".format(user.name))
    await bot.ban(user)

@bot.command(pass_context=True)
@commands.has_role("Staff")
async def FuckOff(ctx, user: discord.Member):
    await bot.say("Fuck off {}, you bitch!!!!!".format(user.name))
    await bot.kick(user)

@bot.command(pass_context=True)
async def Owner(ctx):
    await bot.say("The Owner of the bot is x1Rpg God1x#7449 and the developer is xRedFlame_PvPx#2680")

@bot.command(pass_context=True)
async def info(ctx, user: discord.Member):
    embed = discord.Embed(title="{}'s info".format(user.name), description="Here's what I could find.", color=0x00ff00)
    embed.add_field(name="Name", value=user.name, inline=True)
    embed.add_field(name="ID", value=user.id, inline=True)
    embed.add_field(name="Status", value=user.status, inline=True)
    embed.add_field(name="Highest role", value=user.top_role)
    embed.add_field(name="Joined", value=user.joined_at)
    embed.set_thumbnail(url=user.avatar_url)
    await bot.say(embed=embed)

@bot.command(pass_context=True)
async def serverinfo(ctx, user: discord.Member):
    embed = discord.Embed(name="{}'s info".format(ctx.message.server.name), description="Here's what I could find.", color=0x00ff00)
    embed.set_author(name="Info:")
    embed.add_field(name="Name", value=ctx.message.server.name, inline=True)
    embed.add_field(name="ID", value=ctx.message.server.id, inline=True)
    embed.add_field(name="Roles", value=len(ctx.message.server.roles), inline=True)
    embed.add_field(name="Members", value=len(ctx.message.server.members))
    embed.set_thumbnail(url=ctx.message.server.icon_url)
    await bot.say(embed=embed)

@bot.command(pass_context = True)
async def clear(ctx, number):
    await bot.say("Clearing... Message's will be cleared in about 4.2 seconds!!!")
    await asyncio.sleep(3)
    number = int(number) #Converting the amount of messages to delete to an integer
    counter = 0
    async for x in bot.logs_from(ctx.message.channel, limit = number):
        if counter < number:
            await bot.delete_message(x)
            counter += 1
            await asyncio.sleep(1.2) #1.2 second timer so the deleting process can be even

@bot.command(pass_context=True)
async def warn(ctx, user: discord.Member):
    embed = discord.Embed(title="{} has been warned".format(user.name), description="Here is the warn info.", color=0x00ff00)
    embed.add_field(name="Role", value=user.top_role, inline=True)
    embed.add_field(name="Name", value=user.name, inline=True)
    embed.add_field(name="ID", value=user.id, inline=True)
    embed.add_field(name="Joined", value=user.joined_at, inline=True)
    embed.add_field(name="Warned By", value=ctx.message.author    , inline=True)
    embed.set_thumbnail(url=user.avatar_url)
    await bot.say(embed=embed)

bot.run("Put Your Bot Token Here Do Not Use One From YouTube")
